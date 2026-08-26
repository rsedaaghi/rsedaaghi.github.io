import { useEffect, useState } from "react";

// Module-level cache survives component unmounts, so switching tabs
// never refetches data already loaded during this session.
const jsonCache = new Map();

/**
 * Fetches a JSON resource once and caches it for the whole session.
 * @param {string} url - Absolute public path, e.g. "/assets/data/skills.json"
 * @returns {{data: any|null, loading: boolean, error: Error|null}}
 */
export default function useJsonData(url) {
	const [state, setState] = useState(() => ({
		data: jsonCache.has(url) ? jsonCache.get(url) : null,
		loading: !jsonCache.has(url),
		error: null,
	}));

	useEffect(() => {
		let isSubscribed = true;

		if (jsonCache.has(url)) {
			setState({ data: jsonCache.get(url), loading: false, error: null });
			return () => {
				isSubscribed = false;
			};
		}

		setState({ data: null, loading: true, error: null });

		fetch(url)
			.then((response) => {
				if (!response.ok) throw new Error("Network response was not ok.");
				return response.json();
			})
			.then((data) => {
				jsonCache.set(url, data);
				if (isSubscribed) {
					setState({ data, loading: false, error: null });
				}
			})
			.catch((error) => {
				if (isSubscribed) {
					setState({ data: null, loading: false, error });
				}
			});

		return () => {
			isSubscribed = false;
		};
	}, [url]);

	return state;
}
