# Transpara — Deployment Guide (Hinglish)

Yeh poora project ready hai live website banane ke liye. Neeche steps follow karo — koi coding nahi karni.

## Step 1: GitHub account banao (agar nahi hai)
1. https://github.com pe jao, "Sign up" karo (free hai)

## Step 2: Is folder ko GitHub pe upload karo
1. GitHub pe login karke "New repository" banao, naam do: `transpara`
2. "Add file" > "Upload files" click karo
3. Is poore `transpara-app` folder ke andar ke sabhi files aur folders (package.json, src/ folder, index.html, etc.) drag-and-drop karke upload karo
4. "Commit changes" click karo

## Step 3: Vercel se connect karo
1. https://vercel.com pe jao, "Sign Up" > "Continue with GitHub" select karo
2. Dashboard mein "Add New" > "Project" click karo
3. Apna `transpara` repository dhoondo, "Import" click karo
4. Framework automatically "Vite" detect ho jayega — kuch change mat karo
5. "Deploy" button click karo

## Step 4: Wait karo (1-2 minute)
Deployment complete hone ke baad Vercel tumhe ek live link dega, jaise:
`https://transpara-yourname.vercel.app`

Yeh link koi bhi browser mein khol sakta hai — yehi link Startup Estonia Committee application mein daalna hai.

## Agar koi error aaye
- "Build failed" error aaye toh screenshot lekar mujhe bhejo, main fix bata dunga
- Blank page dikhe toh Vercel dashboard > Deployments > View Logs check karo
