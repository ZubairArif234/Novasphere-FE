import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios from "../configs/axiosConfig";
import { toast } from "sonner";

// ! this is just an example of how create stores with zustand
const store = (set) => ({
  loading: false,
  login: async (payload) => {
    try {
      set({ loading: true });
      const res = await custAxios.post("/auth/login", payload);
     

      if (res) {
        localStorage.setItem("token", res?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
         toast.success('Logged in successfully')
         set({ loading: false });
         return true;
        }
        toast.success('Logged in successfully')
        set({ loading: false });
    } catch (err) {
        console.log(err);
        toast.error(err?.response.data.message)
      set({ loading: false });
    }
  },
  register: async (payload) => {
    try {
      set({ loading: true });
      const res = await custAxios.post("/auth/register", payload);

      if (res) {
        toast.success('Account register successfully')
        set({ loading: false });
        return true;
    }
    toast.success('Account register successfully')
      set({ loading: false });
    } catch (err) {
      console.log(err);
      toast.err(err?.response.data.message)
      set({ loading: false });
    }
  },
});

export const useAuthStore = create(
  devtools(store, {
    enabled: true,
    store: "auth",
  })
);
