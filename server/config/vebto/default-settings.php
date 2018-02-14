<?php

return [
    //SEO
    ['name' => 'seo.home_title', 'value' => 'Architect - Html & Site Builder.'],
    ['name' => 'seo.home_description', 'value' => "Create a free website with Architect. Customize with a free website builder, no coding skills needed. Choose a design, begin customizing and be online today!"],

    //menus
    ['name' => 'menus', 'value' => json_encode([])],

    //billing
    ['name' => 'billing.enable', 'value' => true],
    ['name' => 'billing.paypal_test_mode', 'value' => true],
    ['name' => 'billing.stripe_test_mode', 'value' => true],
    ['name' => 'billing.accepted_card', 'value' => ['visa', 'mastercard', 'american-express', 'discover']],
];
