const UserService = require('../services/user.service')

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
            userType
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
            userType
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
            country
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
                country
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
    GetAllUsers,
    GetUsersByType,
    GetUserById,
    Register,
    UpdateUser,
    DeleteUser
}
