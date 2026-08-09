#!/usr/bin/env bash
# 分段生成旁白（对应 6 个镜头），逐段测时长
set -e
cd "$(dirname "$0")/public/audio"
SEGS=(
"透视商业，用数据看穿生意。"
"第一季度，订单涨了百分之二十八，群里一片叫好。可财务报表上，亏损却从八百万，飙到了两千四百万。"
"为什么越增长，越亏钱？因为订单量、用户数，是虚荣指标，只告诉你规模在变大。而每单赚不赚钱，才是健康指标。"
"这个季度，每单收益从负九块二，恶化到负十七块九。每多做一单，多亏八块七。"
"涨的是亏损，不是生意。补贴，给错了人。"
"透视商业，下期见。"
)
for i in "${!SEGS[@]}"; do
  n=$((i+1))
  printf '%s' "${SEGS[$i]}" > /tmp/narr_seg.txt
  say -v Tingting -f /tmp/narr_seg.txt -o "narration_${n}.aiff"
  afconvert -f WAVE -d LEI16@44100 "narration_${n}.aiff" "narration_${n}.wav"
  rm -f "narration_${n}.aiff"
  dur=$(afinfo "narration_${n}.wav" | grep -oE 'duration: [0-9.]+' | awk '{print $2}')
  printf 'narration_%d.wav  %ss  | %s\n' "$n" "$dur" "${SEGS[$i]}"
done
