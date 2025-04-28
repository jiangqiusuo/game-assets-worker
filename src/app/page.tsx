import Image from "next/image";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    const object = await env.MY_BUCKET.get(key);
    if (object === null) {
      return new Response('Object Not Found', { status: 404 });
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000');
    return new Response(object.body, {
      headers,
    });
  },
};
