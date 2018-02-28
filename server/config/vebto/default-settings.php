<?php

return [
    //SEO
    ['name' => 'seo.home_title', 'value' => 'Architect - Html & Site Builder.'],
    ['name' => 'seo.home_description', 'value' => 'Create a free website with Architect. Customize with a free website builder, no coding skills needed. Choose a design, begin customizing and be online today!'],

    //menus
    ['name' => 'menus', 'value' => json_encode([
        [
            'position' => 'dashboard',
            'name' => 'Dashboard',
            'items' => [['type' => 'route','order' => 1,'condition' => 'admin','position' => 0,'label' => 'Admin Area','action' => 'admin']],
        ]
    ])],

    //billing
    ['name' => 'billing.enable', 'value' => false],
    ['name' => 'billing.paypal_test_mode', 'value' => true],
    ['name' => 'billing.stripe_test_mode', 'value' => true],
    ['name' => 'billing.accepted_cards', 'value' => json_encode(['visa', 'mastercard', 'american-express', 'discover'])],

    //branding
    ['name' => 'branding.site_name', 'value' => 'Architect'],

    //builder
    ['name' => 'builder.routing_type', 'value' => 'regular'],
];
