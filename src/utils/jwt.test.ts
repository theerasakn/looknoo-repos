import { decodeGoogleJwt } from './jwt';

describe('decodeGoogleJwt', () => {
  const mockPayload = {
    sub: '123456',
    name: 'Test User',
    email: 'test@example.com',
    picture: 'https://example.com/photo.jpg',
  };

  const makeToken = (payload: object): string => {
    const header = btoa(JSON.stringify({ alg: 'RS256' }));
    const body = btoa(JSON.stringify(payload));
    return `${header}.${body}.fake-signature`;
  };

  it('decodes a valid JWT and extracts user fields', () => {
    const token = makeToken(mockPayload);
    const user = decodeGoogleJwt(token);
    expect(user).toEqual(mockPayload);
  });

  it('returns null for invalid token format', () => {
    expect(decodeGoogleJwt('not-a-jwt')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(decodeGoogleJwt('')).toBeNull();
  });

  it('returns null for malformed base64', () => {
    expect(decodeGoogleJwt('a.!!!invalid!!!.c')).toBeNull();
  });
});
