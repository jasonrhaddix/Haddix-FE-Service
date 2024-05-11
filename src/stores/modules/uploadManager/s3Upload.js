import api from '@/api'
import s3 from '@/api/aws'

import {
	VUEX_UPLOAD_S3_REQUEST,
	VUEX_UPLOAD_S3_REQUEST_SUCCESS,
	VUEX_UPLOAD_S3_REQUEST_FAILURE,

	VUEX_UPLOAD_ATTACHMENT_REQUEST
} from '@/store/constants/attachments/attachment_upload'
import {
	VUEX_ATTACHMENT_QUEUE_MANAGER_ASSIGN_S3_KEY,
	VUEX_ATTACHMENT_QUEUE_MANAGER_UPLOAD_PROGRESS,
	VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT,
	VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS
} from '@/store/constants/attachments/attachment_queue_manager'
import {
	VUEX_NOTIFICATIONS_ADD_TO_QUEUE
} from '@/store/constants/notifications'

const state = {}

const getters = {}

const actions = {
	[VUEX_UPLOAD_S3_REQUEST]: ({ dispatch, commit }, payload) => {
		// was VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT
		// ...but this didn't seem right.
		// Also is this needed? Shouldn't I set status in AQM?
		/* dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS, {
			hashId: payload.hashId,
			status: HADDIX_UPLOAD_S3_UPLOAD_STATUS__STARTED
		}) */

		let destinationFileKey = `files/${payload.project_id}/${payload.file_id}_${payload.filename}`

		dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_ASSIGN_S3_KEY, {
			hashId: payload.hashId,
			key: destinationFileKey
		})

		const handleS3Response = async function (error, data) {
			if (error) {
				// S3 UPLOAD - FAILURE
				dispatch(VUEX_UPLOAD_S3_REQUEST_FAILURE, {
					hashId: payload.hashId,
					error: error
				})
			} else {
				// S3 UPLOAD - SUCCESS
				await dispatch(VUEX_UPLOAD_S3_REQUEST_SUCCESS, {
					hashId: payload.hashId,
					data: data
				})

				// ATTACHMENT REQUEST
				dispatch(VUEX_UPLOAD_ATTACHMENT_REQUEST, {
					hashId: payload.hashId,
					attachment_id: payload.file_id,
					model_id: payload.attach_to.model_id,
					model: payload.attach_to.model,
					name: payload.filename,
					filename: payload.filename,
					usage_type: payload.usage_type,
					mimetype: payload.file.type,
					size: payload.file.size,
					uri: payload.uri
				})
			}
		}

		const handleS3UploadProgress = function (evt) {
			commit(VUEX_ATTACHMENT_QUEUE_MANAGER_UPLOAD_PROGRESS, evt)
		}

		var params = {
			Key: destinationFileKey,
			Body: payload.file,
			ACL: 'public-read'
		}

		var options = {
			partSize: 5 * 1024 * 1024,
			queueSize: 4
		}

		s3.upload(params, options, handleS3Response).on('httpUploadProgress', handleS3UploadProgress)
	},

	/**
	 * Amend the DB record upon success
	 */
	[VUEX_UPLOAD_S3_REQUEST_SUCCESS]: async ({ dispatch }, payload) => {
		dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT, {
			hashId: payload.hashId,
			uri: payload.data.Location,
			status: HADDIX_UPLOAD_S3_UPLOAD_STATUS__SUCCESS
		})
	},

	/**
	 * Amend the DB record upon failure
	 */
	[VUEX_UPLOAD_S3_REQUEST_FAILURE]: async ({ dispatch }, payload) => {
		dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT, {
			hashId: payload.hashId,
			status: HADDIX_UPLOAD_S3_UPLOAD_STATUS__FAILURE
		})

		dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
			component: {
				path: 'Notifications',
				file: 'Notification_Message'
			},
			data: {
				type: 'error',
				message: 'Error: Attachment Failed upload to Amazon S3'
			}
		})
	},

	[VUEX_UPLOAD_ATTACHMENT_REQUEST]: ({ rootState, dispatch, commit }, payload) => {
		commit(VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS, {
			hashId: payload.hashId,
			status: HADDIX_UPLOAD_ATTACHMENT_STATUS__STARTED
		})

		let data = {
			...payload,
			session_id: rootState.app.sessionToken
		}

		api.post(`/attachments`, data).then(response => {
			commit(VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS, {
				hashId: payload.hashId,
				status: HADDIX_UPLOAD_ATTACHMENT_STATUS__SUCCESS
			})
		}).catch(() => {
			commit(VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS, {
				hashId: payload.hashId,
				status: HADDIX_UPLOAD_ATTACHMENT_STATUS__FAILURE
			})

			dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
				component: {
					path: 'Notifications',
					file: 'Notification_Message'
				},
				data: {
					type: 'error',
					message: 'Attachment Upload Failed'
				}
			})
		})
	}
}

const mutations = {

}

export default {
	state,
	getters,
	actions,
	mutations
}
