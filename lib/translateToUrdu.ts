import translate from '@iamtraction/google-translate';

export async function translateToUrdu(text: string): Promise<string> {
  try {
    const res = await translate(text, { to: 'ur' });
    return res.text;
  } catch (error) {
    console.error('Google Translate Error:', error);
    return '[Translation failed]';
  }
}
