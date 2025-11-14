import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import Event from './event.model'

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId
  email: string
  createdAt: Date
  updatedAt: Date
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient eventId-based queries
BookingSchema.index({ eventId: 1 })

// Pre-save hook: Verify that the referenced event exists
BookingSchema.pre('save', async function (next) {
  const booking = this as IBooking

  // Validate eventId reference only if it's new or modified
  if (booking.isNew || booking.isModified('eventId')) {
    try {
      const eventExists = await Event.findById(booking.eventId)

      if (!eventExists) {
        return next(new Error(`Event with ID ${booking.eventId} does not exist`))
      }
    } catch (error) {
      console.error(error)
      return next(new Error('Failed to validate event reference'))
    }
  }

  next()
})

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)

export default Booking
