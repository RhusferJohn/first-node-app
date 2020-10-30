const UserService = require('../services/user.service')

const GetOrganizationsByUser = async (req, res) => {
    const { user_id } = req.params

    try {
        const organizations = await UserService.FindOneAndPopulate(
            { _id: user_id },
            'organizations'
        )

        return res.status(200).json({
            success: true,
            data: organizations
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occurred while fetching organization list'
        })
    }
}

const GetAllUsers = async (req, res) => {
    try {
        const users = await UserService.Find({})
        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occurred while fetching user list'
        })
    }
}

const GetUsersByType = async (req, res) => {
    const { user_type } = req.params

    try {
        const users = await UserService.Find({
            userType: user_type
        })

        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occurred while fetching user list'
        })
    }
}

const GetUserById = async (req, res) => {
    const { user_id } = req.params

    try {
        const user = await UserService.FindOne({
            _id: user_id
        })

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occurred while fetching user list'
        })
    }
}

const Register = async (req, res) => {
    try {
        const {
            username,
            name,
            email,
            password,
            language,
            country,
            userType,
            organizations
        } = req.body

        const existing_user = await UserService.FindOne({
            email
        })

        if (existing_user) {
            return res.status(409).json({
                success: false,
                error: 'User already exist'
            })
        }

        await UserService.Create({
            username,
            name,
            email,
            password,
            language,
            country,
            userType,
            organizations
        })

        return res.status(200).json({
            success: true,
            message: 'User created'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occurred while creating a user'
        })
    }
}

const UpdateUser = async (req, res) => {
    try {
        const {user_id} = req.params
        const {
            username,
            name,
            email,
            password,
            language,
            country,
            organizations
        } = req.body

        const organization = await UserService.FindOne({
            _id: user_id
        })

        if (!organization) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            })
        }

        await UserService.FindOneAndUpdate(
            { _id: user_id },
            {
                username,
                name,
                email,
                password,
                language,
                country,
                organizations
            }
        )

        return res.status(200).json({
            success: true,
            message: 'User updated'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occurred while updating a user'
        })
    }
}

const DeleteUser = async (req, res) => {
    try {
        const {user_id} = req.params
        await UserService.DeleteOne({ _id: user_id })

        return res.status(200).json({
            success: true,
            message: 'User successfully deleted'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error occurred while deleting a user'
        })
    }
}

module.exports = {
    GetOrganizationsByUser,
    GetAllUsers,
    GetUsersByType,
    GetUserById,
    Register,
    UpdateUser,
    DeleteUser
}
