fun! CompleteMonths(findstart,base)
  if a:findstart
    let line = getline('.') " 得到这一行
    lef start = col('.')-1
    while start > 0 && line[start-1] =~ '\a'
      let start -= 1
    endwhile
    return start
  else
    let res = []
    for m in split("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec")
      if m =~ '^'.. a:base
        call add(res,m)
      endif
    endfor
    return res
  endif
endfun
set completefunc=CompleteMonths
