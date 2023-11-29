import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const userData = JSON.parse(JSON.stringify(user));

    return (
        isAuthenticated && (
            <div>
                <img src={userData.picture} alt={userData.name} />
                <p>{userData.name}</p>
                <p>{userData.nickname}</p>
                <p>{userData.email}</p>
            </div>
        )
    )
}

export default Profile