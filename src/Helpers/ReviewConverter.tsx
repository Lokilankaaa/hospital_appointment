import { DoctorInfo, AppointmentInfo, Review, UserReview, ReviewRequest, DoctorReviewHistoryRequest, DoctorReviewFilter, DoctorSearchCommentRequest } from '../Models/ReviewHistory'
import { userStateInfoManager } from './UserStateInfoManager'
import { doctorStateInfoManager } from './DoctorStateInfoManager'
export function convertToReviewRequest(review: UserReview): ReviewRequest {
	let did = localStorage.getItem('docID')
	return {
		login_token: userStateInfoManager.getLoginToken(),
		did: did ? did : "",
		comment: review.content
	}
}

export function convertToDoctorReviewHistoryRequest(filter: DoctorReviewFilter): DoctorReviewHistoryRequest {
	return {
		did: filter.docID,
		start_time: "1000-06-27T10:25:30.810Z",
		end_time: "3021-06-27T10:25:30.810Z",
		first_index: 0,
		limit: 9999
	}
}

export function convertToDoctorSearchCommentRequest(): DoctorSearchCommentRequest {
	return {
		login_token: doctorStateInfoManager.getLoginToken(),
		start_time: "1000-06-27T10:25:30.810Z",
		end_time: "3021-06-27T10:25:30.810Z",
		first_index: 0,
		limit: 9999
	}
}

export interface reviewResponse {
	cid: 1,
	comment: "string",
	username: "string",
	time: "2021-06-27T10:46:29.398Z"
}

export function convertToDoctorReviewHistoryResonse(data: Array<any>): Array<UserReview> {
	let res = new Array<UserReview>()
	data.map((review: reviewResponse) => {
		res.push({
			cid: review.cid,
			rating: "",
			content: review.comment,
			date: review.time,
			disease: "未知",
			delay: 5,
			userName: review.username,
			userImg: ""
		})
	})
	return res;
}
