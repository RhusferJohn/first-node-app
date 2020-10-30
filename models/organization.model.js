const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema(
    {
        org_name: String,
        org_description: String,
        org_country: String,
        org_city: String,
        org_picture: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
)

const Organization = mongoose.model('organization', OrganizationSchema, 'organization')

module.exports = Organization
