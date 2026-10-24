HOW TO UPLOAD THIS FIXED SITE TO GITHUB PAGES
================================================

WHAT WAS FIXED IN THIS VERSION
- No intrusive ads, no sticky ad banner, no unrelated bottom ads.
- No unverified claims (no "2M+ users", no fake rating count).
- Calculator and weight table now use the SAME formula, so they agree.
  Example: 70 kg, moderate activity, moderate climate = 3.15 L in both.
- Duplicate FAQ removed. One FAQ section, with matching FAQ schema.
- Sources section added (National Academies + Mayo Clinic) and a
  "not medical advice" disclaimer added.
- SEO basics added: meta description, canonical URL, Open Graph tags,
  proper heading order, internal links, robots.txt and a 5-page sitemap.
- New page added: daily-water-by-weight.html

FILES IN THIS ZIP
- index.html (homepage + calculator)
- daily-water-by-weight.html
- about.html, privacy.html, terms.html
- robots.txt, sitemap.xml
- README-UPLOAD.txt (this file - do NOT upload it, it is only for you)

HOW TO UPLOAD (GitHub web, no password needed - Google sign-in works)
1. Unzip this file on your computer.
2. Go to github.com and sign in with Google, open your
   waterintakecalculator.github.io repository.
3. Open the repository root (the main folder, where index.html lives).
4. Click "Add file" > "Upload files".
5. Drag ALL the .html, robots.txt and sitemap.xml files in
   (do not upload this README file, and do not upload a folder inside a folder).
6. Click "Commit changes".
7. Wait 1-2 minutes, then open https://waterintakecalculator.github.io/
   in a private/incognito window and test the calculator.

IMPORTANT CHECKS AFTER UPLOAD
- Test: 70 kg, adult, male, moderate activity, moderate climate
  should show 3.15 liters.
- Check that no old ad code remains. If ads come from another file
  (for example a separate script or theme file in your repo),
  delete that script file too, or tell me its name and I will fix it.
- In Google Search Console, resubmit the sitemap:
  https://waterintakecalculator.github.io/sitemap.xml

WHAT THIS ZIP DOES NOT DO
- It does not change your domain, Google Search Console, or backlinks.
  Those still need: a custom domain (recommended later), Search Console
  sitemap submission, and new content/backlinks over time.
- It is a replacement for the homepage and the 3 legal/about pages.
  If your repo has other files (images, CSS, JS files), keep them unless
  they contain the old ads. If you are unsure, upload only these files
  first and check the live site.
