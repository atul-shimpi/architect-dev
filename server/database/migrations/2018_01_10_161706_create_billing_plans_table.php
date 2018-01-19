<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBillingPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('billing_plans', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('amount');
            $table->string('currency');
            $table->string('interval');
            $table->text('permissions');
            $table->uuid('uuid');
            $table->boolean('recommended')->default(0);
            $table->boolean('free')->default(0);
            $table->boolean('show_permissions')->default(0);
            $table->text('features')->nullable();
            $table->integer('position')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('billing_plans');
    }
}
