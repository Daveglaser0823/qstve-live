import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  // All qstve.com public content routes + palm-desert sign-in
  publicRoutes: [
    // Homepage and main site routes
    '/',
    '/blog',
    '/blog/(.*)',
    '/man-and-machine',
    '/man-and-machine/(.*)',
    '/about',
    '/newsletter',
    '/api/newsletter',
    '/feed.xml',
    // Palm Desert - only sign-in is public; other routes require auth
    '/palm-desert/sign-in(.*)',
    '/api/palm-desert/(.*)',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
