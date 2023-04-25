// Основной модуль

import { fontsStyle, otfToTtf, ttfToWoff } from './gulp/tasks/fonts.js'

import { copy } from './gulp/tasks/copy.js'
import { ftp } from './gulp/tasks/ftp.js'
import gulp from 'gulp'
import { html } from './gulp/tasks/html.js'
import { images } from './gulp/tasks/images.js'
import { js } from './gulp/tasks/js.js'
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'
import { reset } from './gulp/tasks/reset.js'
import { scss } from './gulp/tasks/scss.js'
import { server } from './gulp/tasks/server.js'
import { svgSpriteTask } from './gulp/tasks/svg-sprive.js'
import { zip } from './gulp/tasks/zip.js'

// Импорт путей

// Импорт общих плагинов

// Передаем значения в глобальную переменную
global.app = {
   isBuild: process.argv.includes('--build'),
   isDev: !process.argv.includes('--build'),
   path: path,
   gulp: gulp,
   plugins: plugins,
}

// Импорт задач

// Наблюдатель за изменениями в файлах
function watcher() {
   gulp.watch(path.watch.files, { usePolling: true }, copy)
   gulp.watch(path.watch.html, { usePolling: true }, gulp.series(html, scss)) //gulp.series(html, ftp)
   gulp.watch(path.watch.scss, { usePolling: true }, scss)
   gulp.watch(path.watch.js, { usePolling: true }, js)
   gulp.watch(path.watch.images, { usePolling: true }, images)
}

// Последовательная обработака шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svgSpriteTask))

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)
const deployZIP = gulp.series(reset, mainTasks, zip)
const deployFTP = gulp.series(reset, mainTasks, ftp)

// Экспорт сценариев
export { svgSpriteTask }
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('default', dev)
