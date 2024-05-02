/**
 * Plugins
 *
 */
// Global imports
// import Vue from 'vue'
import app from '@/main.js'

/**
 * Fontawesome
 *
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faCode,
	faFolder,
	faFolderOpen,
	faFileImage,
	faFileVideo,
	faFilePdf,
	faEllipsisH,
	faStar
} from '@fortawesome/free-solid-svg-icons'
import {
	faGithub,
	faMedium,
	faTwitter,
	faCodepen,
	faLinkedin,
	faMarkdown,
	faCss3,
	faHtml5,
	faVuejs,
	faYarn,
	faNodeJs,
	faJs
} from '@fortawesome/free-brands-svg-icons'

/**
 * Google Maps
 *
 */
import * as VueGoogleMaps from 'vue2-google-maps'

library.add(
	/* FAS Icons */
	faCode,
	faFolder,
	faFolderOpen,
	faFileImage,
	faFileVideo,
	faFilePdf,
	faEllipsisH,
	faStar,

	/* FAB Icons */
	faGithub,
	faMedium,
	faTwitter,
	faCodepen,
	faLinkedin,
	faMarkdown,
	faCss3,
	faHtml5,
	faVuejs,
	faYarn,
	faNodeJs,
	faJs
)

export const fontawesome = app.component('font-awesome-icon', FontAwesomeIcon)

export const gmaps = app.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyDtY7XcAta9D76108tUv_JIOOfCFvvx-uQ'
		// libraries: 'places', // This is required if you use the Autocomplete plugin
		// OR: libraries: 'places,drawing'
		// OR: libraries: 'places,drawing,visualization'
		// (as you require)

		/// / If you want to set the version, you can do so:
		// v: '3.26',
	}

	/// / If you intend to programmatically custom event listener code
	/// / (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
	/// / instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
	/// / you might need to turn this on.
	// autobindAllEvents: false,

	/// / If you want to manually install components, e.g.
	/// / import {GmapMarker} from 'vue2-google-maps/src/components/marker'
	/// / Vue.component('GmapMarker', GmapMarker)
	/// / then disable the following:
	// installComponents: true,
})
