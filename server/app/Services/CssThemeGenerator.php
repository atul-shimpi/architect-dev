<?php namespace App\Services;

use File;
use Leafo\ScssPhp\Block;
use Leafo\ScssPhp\Parser;
use Symfony\Component\Finder\Finder;

class CssThemeGenerator
{
    private $variables = [
        'site-bg-color-400',
    ];

    private $matches = [];

    public function generate()
    {
        $dir = base_path('../client/src/app');
        $parser = new Parser(null);

        $tree = $parser->parse(file_get_contents(base_path('../client/src/app/html-builder/inspector/inspector.component.scss')));
        $this->parseSassBlock($tree);
        dd($this->matches);
        die;

        $files = iterator_to_array(Finder::create()->name('*.scss')->files()->in($dir), false);

        foreach ($files as $file) {
            $tree = $parser->parse(file_get_contents($file->getRealPath()));
            $this->parseSassBlock($tree);
        }

        dd($this->matches);

        die;
    }

    /**
     * @param Block $tree
     */
    private function parseSassBlock(Block $tree)
    {
        foreach ($tree->children as $child) {
            $childType = $child[0];
            $childBlock = $child[1];

            if ($childType === 'block') {
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

                if ($assignValueType === 'list' && $assignKey === 'border') {
                    $this->addMatch($block->selectors, 'border-color', $variableIndex);
                }

                else if ($assignValueType === 'var' && $variableIndex > -1) {
                    $this->addMatch($block->selectors, $assignKey, $variableIndex);
                }
            }
        }
    }

    /**
     * @param $selectors
     * @param $assignKey
     * @param $variableIndex
     */
    private function addMatch($selectors, $assignKey, $variableIndex)
    {
        $selectors = array_map(function($selector) {
            return join(array_flatten($selector), '');
        }, $selectors);

        $this->matches[] = [
            'selector' => implode($selectors, ', '),
            'key' => $assignKey,
            'variable' => $this->variables[$variableIndex],
        ];
    }
}