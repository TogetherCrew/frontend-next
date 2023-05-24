import { useMutation, UseMutationOptions } from 'react-query';
import UserApi from '../api/UserApi';
import { IUserResponse } from '../utils/interfaces';

export function useUpdateEmail(
  options?: UseMutationOptions<IUserResponse, Error, { email: string }>
) {
  return useMutation(
    (payload: { email: string }) => UserApi.updateEmail(payload),
    options
  );
}
