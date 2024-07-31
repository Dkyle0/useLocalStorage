import { useEffect, useState } from "react";

type ReturnValue = [
	string | null,
	{
	  setItem: (value: string) => void,
	  removeItem: () => void,
	}
  ];
  
  type UseLocalStorage = (key: string) => ReturnValue;
  
  const getValueStorage = (key: string): string | null => {
	if (key) {
	  const item = localStorage.getItem(key);

	  if (item) {
		return JSON.parse(item);
	  }
	}

	return null;
  }
  
  export const useLocalStorage: UseLocalStorage = (key) => {
	const [value, setValue] = useState<string | null>(() => getValueStorage(key));
  
	useEffect(() => {
	  if (value !== null) {
		localStorage.setItem(key, JSON.stringify(value));
	  } else {
		localStorage.removeItem(key);
	  }
	}, [value, key]);
  
	const setItem = (newValue: string) => {
	  setValue(newValue);
	};
  
	const removeItem = () => {
	  setValue(null);
	};
  
	return [value, { setItem, removeItem }];
  };
