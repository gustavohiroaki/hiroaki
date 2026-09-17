from pathlib import Path
import math, subprocess, zipfile
from PIL import Image, ImageDraw
OUT=Path(__file__).resolve().parent
BLUE=(0,49,229); BG=(241,245,254)
# Pontos reconstruídos na escala original de 1080 × 1080.
paths=[
 ([(528,209),(250,366),(543,536),(825,374),(674,290),(537,369)],5,0.15,2.1),
 ([(246,374),(246,701),(538,869),(538,672),(417,612)],5,0.55,2.15),
 ([(834,383),(549,546),(549,870),(827,700),(827,546),(695,626)],5,0.8,2.15),
 ([(250,366),(825,377)],1.5,2.1,0.8),
 ([(246,701),(544,543),(827,700)],1.5,2.25,0.85),
 ([(246,374),(540,546)],5,0.4,1.2),
]
def svg(animated=False,background=False):
 css=''
 if animated:
  css='@keyframes cycle{0%,78%{opacity:1}92%,100%{opacity:0}} .mark{animation:cycle 6s linear infinite;}'
  for i,(_,_,start,duration) in enumerate(paths):
   css+=f'@keyframes draw{i}{{0%,{start/6*100:.4f}%{{stroke-dashoffset:1}}{(start+duration)/6*100:.4f}%,100%{{stroke-dashoffset:0}}}} .p{i}{{stroke-dasharray:1;stroke-dashoffset:0;animation:draw{i} 6s linear infinite;}}'
  css+='@media(prefers-reduced-motion:reduce){.mark,path{animation:none!important;stroke-dashoffset:0!important;opacity:1!important}}'
 s=['<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080" role="img" aria-labelledby="title">','<title id="title">Logo geométrica azul'+(' — animação de desenho' if animated else '')+'</title>']
 if css:s.append('<style>'+css+'</style>')
 if background:s.append('<path fill="#f1f5fe" d="M0 0H1080V1080H0Z"/>')
 s.append('<g class="mark" fill="none" stroke="#0031e5" stroke-linecap="round" stroke-linejoin="round">')
 for i,(pts,width,_,_) in enumerate(paths):
  d='M'+' L'.join(f'{x} {y}' for x,y in pts)
  s.append(f'<path class="p{i}" pathLength="1" stroke-width="{width}" d="{d}"/>')
 return '\n'.join(s+['</g>','</svg>'])
for name,a,b in [('logo.svg',False,False),('logo-fundo-claro.svg',False,True),('logo-animada.svg',True,False),('logo-animada-fundo-claro.svg',True,True)]:
 (OUT/name).write_text(svg(a,b))

def partial(pts,p):
 lengths=[math.dist(a,b) for a,b in zip(pts,pts[1:])]; remaining=sum(lengths)*p; result=[pts[0]]
 for a,b,l in zip(pts,pts[1:],lengths):
  if remaining>=l:result.append(b);remaining-=l
  else:
   result.append((a[0]+(b[0]-a[0])*remaining/l,a[1]+(b[1]-a[1])*remaining/l));break
 return result

def frame(t=None):
 scale=2
 im=Image.new('RGB',(1080*scale,1080*scale),BG);dr=ImageDraw.Draw(im)
 opacity=1 if t is None or t<=4.68 else max(0,1-(t-4.68)/0.84)
 color=tuple(round(b+(c-b)*opacity) for b,c in zip(BG,BLUE))
 for pts,w,start,duration in paths:
  p=1 if t is None else max(0,min(1,(t-start)/duration))
  if p<=0:continue
  xy=[(x*scale,y*scale) for x,y in partial(pts,p)]
  dr.line(xy,fill=color,width=round(w*scale),joint='curve')
  r=w*scale/2
  for x,y in xy:dr.ellipse((x-r,y-r,x+r,y+r),fill=color)
 return im.resize((1080,1080),Image.Resampling.LANCZOS)
frame().save(OUT/'logo-preview.png')
cmd=['ffmpeg','-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s','1080x1080','-r','30','-i','-','-an','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'logo-animada.mp4')]
p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
for n in range(180):p.stdin.write(frame(n/30).tobytes())
p.stdin.close()
if p.wait()!=0:raise RuntimeError('Falha ao exportar vídeo')
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(OUT/'logo-animada.mp4'),'-filter_complex','fps=20,scale=540:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=full[p];[b][p]paletteuse=dither=sierra2_4a','-loop','0',str(OUT/'logo-animada.gif')],check=True)
(OUT/'LEIA-ME.txt').write_text('Logo reconstruída com caminhos vetoriais editáveis.\nCor: #0031E5. Fundo claro: #F1F5FE. Prancheta: 1080 × 1080.\nlogo.svg: vetor estático com fundo transparente.\nlogo-fundo-claro.svg: vetor estático com fundo original.\nlogo-animada.svg: animação CSS vetorial, fundo transparente.\nlogo-animada-fundo-claro.svg: animação CSS vetorial, fundo claro.\nSVG animado: abrir em navegador; editores gráficos podem mostrar somente a logo estática. Respeita preferência de movimento reduzido.\nMP4: 1080 × 1080, 30 fps, 6 segundos, sem áudio.\nGIF: 540 × 540, 20 fps, repetição contínua.\nA animação desenha os contornos, revela as linhas finas, mantém a logo e desaparece para repetir.\nGerar.py permite ajustar pontos, espessuras e tempos (Python 3, Pillow e FFmpeg).\n')
with zipfile.ZipFile(OUT/'logo-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
 for file in OUT.iterdir():
  if file.suffix in ['.svg','.png','.mp4','.gif','.txt','.py']:z.write(file,file.name)
print(OUT)
