import '@less/branding.less'
import $ from "jquery";



$('.ui.sidebar').sidebar('attach events', '.toggle-burger', 'show');
$('.ui.sidebar').sidebar('attach events', '.close', 'close');
