import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetState, selectCurrentRefreshToken, selectCurrentRole, selectCurrentToken, setCredentials, type AuthState } from "@/store/slices/authSlice";

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  const role = useAppSelector(selectCurrentRole);
  const refreshToken = useAppSelector(selectCurrentRefreshToken);

  const dispatch = useAppDispatch();

  const handleAddCredentials = (credentials: AuthState) => {
    dispatch(setCredentials(credentials))
  }

  const handleResetAuth = () => {
    dispatch(resetState());
  }

  return { token, role, refreshToken, handleResetAuth, handleAddCredentials };

}

export default useAuth;