import api from './api';

export const socialService = {
    async followUser(userId) {
        return await api.post('/social/follows/follow/', { user_id: userId });
    },

    async unfollowUser(userId) {
        return await api.post('/social/follows/unfollow/', { user_id: userId });
    },

    async getFeed(page = 1) {
        return await api.get(`/social/feed/?page=${page}`);
    },

    async likeWorkout(workoutId) {
        return await api.post('/social/likes/', { workout: workoutId });
    },

    async unlikeWorkout(workoutId) {
        return await api.delete(`/social/likes/${workoutId}/`);
    },

    async commentOnWorkout(workoutId, content) {
        return await api.post('/social/comments/', {
            workout: workoutId,
            content
        });
    },

    async getWorkoutComments(workoutId) {
        return await api.get(`/social/comments/?workout=${workoutId}`);
    }
};