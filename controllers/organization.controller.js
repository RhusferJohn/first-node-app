const { model } = require('../models/organization.model')
const Organization = require('../models/organization.model')
const { FindOneAndUpdate } = require('../services/organization.service')
const OrganizationService = require('../services/organization.service')

const GetAllOrganizations = async (req, res) => {
    try {
        const organizations = await OrganizationService.Find()
        return res.status(200).json({
            success: true,
            data: organizations
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occured'
        })
    }
}

const AddOrganization = async (req, res) => {
    try {
        const {
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture
        } = req.body

        const existing_organization = await OrganizationService.FindOne({
            org_name
        })

        if (existing_organization) {
            return res.status(409).json({
                success: false,
                error: 'Organization already exist'
            })
        }

        await OrganizationService.Create({
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture
        })

        return res.status(200).json({
            success: true,
            message: 'Organization created'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occured'
        })
    }
}

const UpdateOrganization = async (req, res) => {
    try {
        const {organization_id} = req.params
        const {
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture
        } = req.body

        const organization = await OrganizationService.FindOne({
            _id: organization_id
        })

        if (!organization) {
            return res.status(404).json({
                success: false,
                error: 'Organization not found'
            }) 
        }

        await OrganizationService.FindOneAndUpdate(
            { _id: organization_id },
            {
                org_name,
                org_description,
                org_country,
                org_city,
                org_picture
            }
        )

        return res.status(200).json({
            success: true,
            error: 'Organization updated'
        }) 
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occured'
        })
    }
}

const DeleteOrganization = async (req, res) => {
    try {
        const {organization_id} = req.params
        await OrganizationService.DeleteOne({ _id: organization_id })

        return res.status(200).json({
            success: true,
            data: 'Organization successfully deleted'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occured'
        })
    }
}

module.exports = {
    GetAllOrganizations,
    AddOrganization,
    UpdateOrganization,
    DeleteOrganization
}