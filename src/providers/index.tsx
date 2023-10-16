"use client";
// TODO: Andrei, i'm keeping this GridProvider in here so you can take a look at it. looks awesome. see files like src/blocks/CallToAction
import { GridProvider } from "@faceless-ui/css-grid";
import React from "react";
import { SWRConfig } from "swr";

import cssVariables from "../../cssVariables";
import { ContextProvider } from "../context/context";

// import { AuthProvider } from './Auth'
const fetcher = (...args: [RequestInfo, RequestInit?]) =>
	fetch(...args).then(res => res.json());

export const Providers: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		// <AuthProvider>
		<SWRConfig value={{ fetcher }}>
			<ContextProvider>
				<GridProvider
					breakpoints={{
						s: cssVariables.breakpoints.s,
						m: cssVariables.breakpoints.m,
						l: cssVariables.breakpoints.l,
					}}
					colGap={{
						s: "24px",
						m: "48px",
						l: "48px",
						xl: "72px",
					}}
					cols={{
						s: 4,
						m: 4,
						l: 12,
						xl: 12,
					}}
				>
					{children}
				</GridProvider>
			</ContextProvider>
		</SWRConfig>
		// </AuthProvider>
	);
};
