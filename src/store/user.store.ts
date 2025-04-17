import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppUser } from "@/types/user.types";
import { RootState } from ".";
import toast from "react-hot-toast";

interface IUser {
  user: Partial<AppUser>;
}

const initialState: IUser = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<AppUser>>) => {
      state.user = action.payload;
    },
  },
});

const logout = createAsyncThunk<void, void>(
  "users/logout",
  async (_, { dispatch }) => {
    try {
      dispatch(userActions.setUser({}));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to clear user data on logout.");
    }
  }
);

export const userActions = {
  ...userSlice.actions,
  logout,
};

export const userSelectors = {
  selectUser: (state: RootState) => state.user.user,
  selectIsUserLoggedIn: (state: RootState) => {
    return Boolean(state.user.user && state.user.user?.id);
  },
  selectUserId: (state: RootState) => state.user.user.id,
};

export default userSlice.reducer;
