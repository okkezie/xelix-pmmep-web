
const User = class {
    #id
    #name
    #email
    #phone
    #mda
    #office
    #gradeLevel
    #jobTitle
    #gender
    #verified
    #avatar = new Avatar()
    #userType
    #status
    #dateOfBirth = new Date()
    #roles = []
    #permissions = []

    constructor(user, fromString = false) {
        if (fromString) {
            user = JSON.parse(user)
        }
        this.#id = user?.id
        this.#name = user?.name
        this.#email = user?.email
        this.#phone = user?.phone
        this.#mda = user?.mda
        this.#office = user?.office
        this.#gradeLevel = user?.gradeLevel
        this.#jobTitle = user?.jobTitle
        this.#gender = user?.gender
        this.#verified = user?.verified
        this.#avatar = new Avatar(user?.avatar)
        this.#userType = user?.userType
        this.#status = user?.status
        this.#dateOfBirth = user?.dateOfBirth
        this.#roles = user?.roles
        this.#permissions = user?.permissions
    }

    getId() {
        return this.#id
    }

    getName() {
        return this.#name
    }
    
    getEmail() {
        return this.#email
    }

    getPhone() {
        return this.#phone
    }
    
    getMda() {
        return this.#mda
    }

    getOffice() {
        return this.#office
    }

    getGradeLevel() {
        return this.#gradeLevel
    }

    getJobTitle() {
        return this.#jobTitle
    }

    getGender() {
        return this.#gender
    }

    getVerified() {
        return this.#verified
    }

    getAvatar() {
        return this.#avatar
    }
    
    getUserType() {
        return this.#userType
    }

    getDateOfBirth() {
        return this.#dateOfBirth
    }

    getRoles() {
        return this.#roles
    }

    getPermissions() {
        return this.#permissions
    }

    getStatus() {
        return this.#status
    }
}

export const Avatar = class {
    #icon
    #thumbnail
    #full

    constructor(avatar) {
        this.#icon = avatar?.icon
        this.#thumbnail = avatar?.thumbnail
        this.#full = avatar?.full
    }

    getIcon() {
        return this.#icon
    }
    
    getThumbnail() {
        return this.#thumbnail
    }

    getFull() {
        return this.#full
    }
}

export default User
