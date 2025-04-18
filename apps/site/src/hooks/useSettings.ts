import { useAppDispatch, useAppSelector } from '@/store';
import { setTheme } from '@/store/settings';
import type { ThemeMode } from '@/types';

export function useSettings() {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  return {
    ...settings,

    setTheme(theme: ThemeMode) {
      dispatch(setTheme(theme));
    },
  };
}
