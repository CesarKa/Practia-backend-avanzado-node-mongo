export function changeLanguage (req, res, nex) {
    const lang = req.params.locale
    res.cookie('nodepop-locale', lang, {
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
  })

  // redirect to the same page
  res.redirect('back')
}