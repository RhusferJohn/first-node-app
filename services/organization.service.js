const Organization = require('../models/organization.model')

const find = async () => {
    const organizations = await Organization.find({})
    return organizations
}

module.exports = {
    find
}