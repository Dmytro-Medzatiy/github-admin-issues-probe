/**
 * Created by DMedzatiy on 31-Aug-16.
 */

const getCommentsList = () => state => state.get('comments').comments;


export {
    getCommentsList,
}