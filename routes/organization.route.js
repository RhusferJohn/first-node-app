const express = require('express')
const router = express.Router()

const OrganizationController = require('../controllers/organization.controller')
const Organization = require('../models/organization.model')

router.get('/organizations', OrganizationController.GetAllOrganizations)
router.post('/organization', OrganizationController.AddOrganization)

module.exports = router