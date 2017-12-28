<?php namespace App\Services;

use File;
use Leafo\ScssPhp\Block;
use Leafo\ScssPhp\Parser;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class CssThemeGenerator
{
    private $variables = [
        'site-primary-color-100',
        'site-primary-color-200',
        'site-bg-color-100',
        'site-bg-color-200',
        'site-bg-color-300',
        'site-bg-color-400',
        'site-text-color-100',
        'site-text-color-200',
        'site-text-color-300',
        'site-text-color-400',
        'site-border-color-100',
        'site-border-color-200',
    ];

    private $matches = [];

    public function generate()
    {
        $dir = base_path('../client/src/app');
        $parser = new Parser(null);

        $files = iterator_to_array(Finder::create()->name('*.scss')->files()->in($dir), false);

        foreach ($files as $file) {
            $tree = $parser->parse(file_get_contents($file->getRealPath()));
            $this->parseSassBlock($tree);
        }

        $this->generateCss();
    }

    /**
     * Generate a valid css file from sass files of components that contain variables.
     *
     * @return string
     */
    private function generateCss()
    {
        $grouped = $this->groupMatchesByVariable();
        $css = '';

        foreach ($grouped as $variable => $group) {
            foreach ($group as $property => $matches) {
                $selectors = array_map(function($match) {
                    return $match['selector'];
                }, $matches);

                $selectors = join($selectors, ",\n");

                $css .= "$selectors\n{\n\t$property: var(--$variable);\n}\n\n";
            }
        }

        $rootBlock = $this->generateCssVariablesRootBlock();

        $css = $rootBlock . $css;

        File::put(resource_path('value-lists/editable-theme.css'), $css);

        return $css;
    }

    /**
     * Generate css :root block containing variables.
     *
     * @return string
     */
    private function generateCssVariablesRootBlock()
    {
        $sassVars = $this->getSassVariableFileContents();

        $variables = collect($this->variables)->mapWithKeys(function($variable) use($sassVars) {
            return [$variable => $this->extractVariableValue($sassVars, $variable)];
        })->map(function($value, $name) {
            return "\t--$name: $value;";
        })->implode("\n");

        return ":root {\n$variables\n}\n\n";
    }

    /**
     * Get contents of all _variables.scss files.
     *
     * @return string
     */
    private function getSassVariableFileContents()
    {
        $dirs = [base_path('../client/src/'), base_path('../client/node_modules/vebto-client')];

        $files = iterator_to_array(Finder::create()->name('*_variables.scss')->files()->in($dirs), false);

        return collect($files)->map(function(SplFileInfo $file) {
            return File::get($file->getRealPath());
        })->implode('');
    }

    /**
     * Extract specified sass variable value recursively.
     *
     * @param string $sass
     * @param string $variable
     * @return string
     */
    private function extractVariableValue($sass, $variable)
    {
        $variable = str_replace('$', '', $variable);
        preg_match("/$variable:(.+?);/", $sass, $matches);

        $value = trim(str_replace('!default', '', $matches[1]));

        if (str_contains($value, '$')) {
            $value = $this->extractVariableValue($sass, $value);
        }

        return $value;
    }

    /**
     * Group all matches by variable name and then by css property name.
     *
     * @return array
     */
    private function groupMatchesByVariable() {
        $grouped = [];

        //group matches by variable, example "site-bg-color-400"
        foreach ($this->matches as $match) {
            $grouped[$match['variable']][] = $match;
        }

        //group each variable group by property name, example: "border-color"
        foreach ($grouped as $groupName => $group) {
            foreach ($group as $matchKey => $match) {
                $grouped[$groupName][$match['property']][] = $match;
                unset($grouped[$groupName][$matchKey]);
            }
        }

        return $grouped;
    }

    /**
     * @param Block $block
     */
    private function parseSassBlock(Block $block)
    {
        foreach ($block->children as $child) {
            $childType = $child[0];
            $childBlock = $child[1];

            if ($childType === 'block') {
                if ($block->selectors) $childBlock->parent = $block;
                $this->getSelectorsFromBlock($childBlock);
                $this->parseSassBlock($childBlock);
            }
        }
    }

    /**
     * Extract css selectors that contain variables from specified sass block.
     *
     * @param Block $block
     */
    private function getSelectorsFromBlock(Block $block) {
        foreach ($block->children as $child) {
            $childType = $child[0];

            if ($childType === 'assign') {
                $assignKey = $child[1][2][0];
                $assignValueType = $child[2][0];
                $assignValue = $child[2][1];

                $variableIndex = array_search($assignValue, $this->variables);

                if ($assignValueType === 'list' && str_contains($assignKey, 'border')) {
                    $this->addMatch($block, 'border-color', $variableIndex);
                }

                else if ($assignValueType === 'var' && $variableIndex > -1) {
                    $this->addMatch($block, $assignKey, $variableIndex);
                }
            }
        }
    }

    /**
     * @param Block $block
     * @param $assignKey
     * @param $variableIndex
     */
    private function addMatch(Block $block, $assignKey, $variableIndex)
    {
        $parent = $this->makeParentSelector($block);
        $child  = $this->makeSelectorString($block->selectors);
        $selector = $this->formatSelectorString($parent.' '.$child);

        $this->matches[] = [
            'selector' => $selector,
            'property' => $assignKey,
            'variable' => $this->variables[$variableIndex],
        ];
    }

    /**
     * Generate selectors string from specified sass selectors array.
     *
     * @param array $selectors
     * @return string
     */
    private function makeSelectorString($selectors)
    {
        $selector = collect($selectors)
            ->flatten()
            ->filter(function($part) {
                return $part !== 'string';
            })->map(function($part) {
                return $part === 'self' ? '&' : $part;
            })->implode('');

        return $selector;
    }

    /**
     * Generate parent selector to the root parent for specified block.
     *
     * @param Block $block
     * @return string
     */
    private function makeParentSelector(Block $block)
    {
        $parent = isset($block->parent) ? $block->parent : null;
        $parentSelector = [];

        while ($parent) {
            $parentSelector[] = $this->makeSelectorString($parent->selectors);
            $parent = isset($parent->parent) ? $parent->parent : null;
        }

        return join(array_reverse($parentSelector), ' ');
    }

    /**
     * Correct some selector formatting issues.
     *
     * @param string $selector
     * @return string
     */
    private function formatSelectorString($selector)
    {
        //remove space between selector and :hover
        $selector = str_replace(' :hover', ':hover', $selector);

        //add a space between > and selector
        $selector = preg_replace("/>([^ ])/", "> $1", $selector);
        $selector = preg_replace("/([^ ])>/", "$1 >", $selector);

        //transform sass "self" selector into css "self" selector
        //example: ".class1 &.class2" into ".class1.class2"
        $selector = str_replace(" &", '', $selector);

        return trim($selector);
    }
}