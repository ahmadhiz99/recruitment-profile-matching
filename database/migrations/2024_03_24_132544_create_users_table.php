<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('fullname')->nullable();
            $table->string('nickname')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('whatsapp')->nullable();
            $table->text('cv')->nullable();
            $table->text('ijazah')->nullable();
            $table->text('portofolio')->nullable();
            $table->integer('qualified')->default('0');
            $table->string('password');
            $table->rememberToken();

            $table->unsignedBigInteger('role_id');
            $table->foreign('role_id')->references('id')->on('roles')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
