import mongoose, { Document, Model, Schema } from 'mongoose';
import { LocationAttributes } from './location.types';

export interface LocationDocument extends Document, LocationAttributes {}

interface LocationModel extends Model<LocationDocument> {}

const locationSchema: Schema<LocationDocument, LocationModel> =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          default: [0, 0],
        },
      },
    },
    { timestamps: true }
  );

// Index for geospatial queries
locationSchema.index({ coordinates: '2dsphere' });

const LocationModel = mongoose.model<LocationDocument, LocationModel>(
  'Location',
  locationSchema
);

export default LocationModel;
