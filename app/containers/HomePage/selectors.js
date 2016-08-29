/**
 * Created on 29.08.2016.
 */

const getSignedUser = () => state => state.get('user').user;

export {
    getSignedUser,
}