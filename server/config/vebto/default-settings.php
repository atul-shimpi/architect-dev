<?php

return [
    //dates
    ['name' => 'dates.format', 'value' => '%b %e, %H:%M'],
    ['name' => 'dates.locale', 'value' => 'en_US'],

    //social login
    ['name' => 'social.google.enable', 'value' => 1],
    ['name' => 'social.twitter.enable', 'value' => 1],
    ['name' => 'social.facebook.enable', 'value' => 1],

    //real time
    ['name' => 'realtime.enable', 'value' => 0],

    //temp
    ['name' => 'registration.disable', 'value' => 0],

    //cache
    ['name' => 'cache.report_minutes', 'value' => 60],
    ['name' => 'cache.homepage_days', 'value' => 1],
    ['name' => 'automation.artist_interval', 'value' => 7],

    //branding
    ['name' => 'branding.use_custom_theme', 'value' => 0],
    ['name' => 'branding.site_logo', 'value' => 'assets/images/logo.png'],
    ['name' => 'branding.site_name', 'value' => 'BeMusic'],
    ['name' => 'branding.favicon', 'value' => 'favicon.ico'],

    //translations
    ['name' => 'i18n.default_localization', 'value' => 'English'],
    ['name' => 'i18n.enable', 'value' => 1],

    //SEO
    ['name' => 'seo.home_title', 'value' => 'Architect - Html & Site Builder.'],
    ['name' => 'seo.home_description', 'value' => "Create a free website with Architect. Customize with a free website builder, no coding skills needed. Choose a design, begin customizing and be online today!"],

    //sentry
    ['name' => 'logging.sentry_public', 'value' => null],

    //pusher
    ['name' => 'realtime.pusher_key', 'value' => null],

    //menus
    ['name' => 'menus', 'value' => json_encode([])],
];
