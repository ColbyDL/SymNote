import React from 'react'
import { handleAuth } from '@auth0/nextjs-auth0'

console.log("Auth0 Secret:", process.env.AUTH0_SECRET ? "Loaded" : "Not Found");
export const GET = handleAuth();