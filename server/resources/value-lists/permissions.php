<?php

return [
    'builder' => [
        [
            'name' => 'projects.export',
            'description' => 'Allow user to export projects to their own FTP server.'
        ],
        [
            'name' => 'editors.enable',
            'description' => 'Allow user to use html,css and js code editors.'
        ],
        [
            'name' => 'projects.download',
            'description' => 'Allow user to download their project .zip file.'
        ]
    ],

    //PERMISSIONS
    'permissions' => [
        'permissions.view',
    ],

    //USER GROUPS
    'groups' => [
        'groups.view',
        'groups.create',
        'groups.update',
        'groups.delete',
    ],

    //REPORTS
    'analytics' => [
        'reports.view'
    ],

    //PAGES
    'pages' => [
        'pages.view',
        'pages.create',
        'pages.update',
        'pages.delete',
    ],

    //UPLOADS
    'uploads' => [
        'uploads.view',
        'uploads.create',
        'uploads.delete',
    ],

    //USERS
    'users' => [
        'users.view',
        'users.create',
        'users.update',
        'users.delete',
    ],

    //LOCALIZATIONS
    'localizations' => [
        'localizations.view',
        'localizations.create',
        'localizations.update',
        'localizations.delete',
    ],

    //MAIL TEMPLATES
    'mail_templates' => [
        'mail_templates.view',
        'mail_templates.update',
    ],

    //SETTINGS
    'settings' => [
        'settings.view',
        'settings.update',
    ],
];
