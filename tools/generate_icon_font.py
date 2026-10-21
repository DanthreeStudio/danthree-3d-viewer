import os
import sys
import shutil
import json
import hashlib

from lib import utils as Utils

def Main (argv):
	toolsDir = os.path.dirname (os.path.abspath (__file__))
	rootDir = os.path.dirname (toolsDir)
	os.chdir (rootDir)

	iconsDir = os.path.join (rootDir, 'assets', 'icons')
	tempDir = os.path.join ('build', 'temp')
	if os.path.exists (tempDir):
		shutil.rmtree (tempDir)
	fixedIconsDir = os.path.join (tempDir, 'icons')
	if not os.path.exists (fixedIconsDir):
		os.makedirs (fixedIconsDir)

	iconFontDir = os.path.join (tempDir, 'iconfont')
	if not os.path.exists (iconFontDir):
		os.makedirs (iconFontDir)

	# Use reviewed outlines instead of rasterizing trusted source icons on every build.
	# A changed source must have its outline explicitly reviewed before generating fonts.
	outlinedDir = os.path.join (rootDir, 'assets', 'icons-outlined')
	with open (os.path.join (outlinedDir, 'source-hashes.json'), encoding='utf-8') as source:
		expected = json.load (source)
	actual = {}
	for name in sorted (os.listdir (iconsDir)):
		if name.endswith ('.svg'):
			with open (os.path.join (iconsDir, name), 'rb') as source:
				actual[name] = hashlib.sha256 (source.read ()).hexdigest ()
	if actual != expected:
		raise RuntimeError ('Icon sources changed. Review and export filled paths to assets/icons-outlined, then update source-hashes.json.')
	for name in expected:
		shutil.copyfile (os.path.join (outlinedDir, name), os.path.join (fixedIconsDir, name))
	Utils.RunCommand ('svgo', ['-f', fixedIconsDir])
	Utils.RunCommand ('fantasticon', [
		fixedIconsDir,
		'-o', iconFontDir,
		'-t', 'woff',
		'-n', 'O3DVIcons'
	])

	websiteCssDir = os.path.join (rootDir, 'source', 'website', 'css')
	websiteIconFontDir = os.path.join (websiteCssDir, 'O3DVIcons')
	if not os.path.exists (websiteIconFontDir):
		os.makedirs (websiteIconFontDir)

	websiteIconsCssPath = os.path.join (websiteCssDir, 'icons.css')
	shutil.copy (os.path.join (iconFontDir, 'O3DVIcons.css'), websiteIconsCssPath)
	Utils.ReplaceStringInFile (websiteIconsCssPath, './O3DVIcons.woff', 'O3DVIcons/O3DVIcons.woff')
	shutil.copy (os.path.join (iconFontDir, 'O3DVIcons.woff'), websiteIconFontDir)

	infoCssDir = os.path.join (rootDir, 'website', 'info', 'css')
	shutil.copy (os.path.join (iconFontDir, 'O3DVIcons.css'), os.path.join (infoCssDir, 'icons.css'))
	shutil.copy (os.path.join (iconFontDir, 'O3DVIcons.woff'), os.path.join (infoCssDir, 'O3DVIcons.woff'))

	shutil.rmtree (tempDir)

	return 0

sys.exit (Main (sys.argv))
