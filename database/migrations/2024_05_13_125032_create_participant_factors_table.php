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
        Schema::create('participant_factors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('participant_id');
            $table->unsignedBigInteger('aspect_id');
            $table->foreign('participant_id')->references('id')->on('participants')->cascadeOnDelete();
            $table->foreign('aspect_id')->references('id')->on('aspects')->cascadeOnDelete();
            $table->float('core_factor');
            $table->float('secondary_factor');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participant_factors');
    }
};
