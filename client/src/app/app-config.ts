import {environment} from './../environments/environment';

export const appConfig = {
    environment: environment.production ? 'production' : 'dev',
    navbar: {
        defaultPosition: 'dashboard',
        dropdownItems: [
            {route: '/dashboard', name: 'Dashboard', icon: 'web-design-custom'},
        ]
    },
    admin: {
        pages: [
            {name: 'templates', icon: 'web-design-custom', route: 'templates', permission: 'templates.view'},
            {name: 'projects', icon: 'dashboard', route: 'projects', permission: 'projects.view'},
        ],
        appearance: {
            defaultRoute: 'dashboard',
            navigationRoutes: [
                'dashboard',
                'dashboard/projects/new',
                'builder',
            ],
            menus: {
                availableRoutes:  [
                    'dashboard',
                    'dashboard/projects/new',
                ],
                positions: [
                    'dashboard',
                    'admin'
                ]
            },
        }
    },
};