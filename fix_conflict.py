import re
with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r'<<<<<<< ours\n=======\n\n        if \(process\.env\.NODE_ENV === \'development\'\) {\n            console\.log\(spline\.getAllObjects\(\)\.map\(\(o: SPEObject & \{ type\?: string \}\) => \(\{ name: o\.name, type: o\.type \}\)\)\);\n        }\n>>>>>>> theirs\n',
    '',
    content
)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
