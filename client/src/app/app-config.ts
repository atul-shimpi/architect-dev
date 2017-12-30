import {environment} from './../environments/environment';

export const appConfig = {
    admin: {
        environment: environment.production ? 'production' : 'dev',
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
            fields: {
                colors: {route: 'dashboard'},
            }
        }
    }
};