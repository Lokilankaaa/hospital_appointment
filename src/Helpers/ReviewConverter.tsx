import { DoctorInfo, AppointmentInfo, Review, UserReview, ReviewRequest} from '../Models/ReviewHistory'
import { userStateInfoManager } from './UserStateInfoManager'
export function convertToReviewRequest(review: Review): ReviewRequest {
    return {
        login_token: userStateInfoManager.getLoginToken(),
        did: review.doctorID,
        comment: review.doctorID
      }
}