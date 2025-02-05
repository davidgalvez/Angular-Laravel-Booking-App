<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Apartment extends Model
{
    use HasFactory;
    protected $fillable = ['landlord_id', 'title', 'description', 'air_conditioning', 'heating', 'elevator', 'available'];

    public function landlord(): BelongsTo {
        return $this->belongsTo(Landlord::class);
    }

    public function reservations(): HasMany {
        return $this->hasMany(Reservation::class);
    }
}
