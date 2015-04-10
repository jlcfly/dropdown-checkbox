# dropdown-checkbox
jQuery-based drop down checkbox list

dropdown-checkbox is a jQuery-based drop down checkbox list meant to easily replace the HTML `select` tag with the "multiple" attribute added and turn it into a dropdown list using checkboxes. The checkbox list synchronizes with the `select` id as items are checked and unchecked, so you can submit it with your form as normal.

See demo.html for examples.

Sample code:

In your header...

	<link rel="stylesheet" href="dropdowncheckbox.css">
	<script src="jquery-1.8.3.min.js"></script>
	<script src="dropdowncheckbox.js"></script>

A normal select...

	<select "fruit" multiple="multiple">
		<option value="1">Apples</option>
		<option value="2">Oranges</option>
		<option value="3">Cherries</option>
		<option value="4">Peaches</option>
		<option value="5">Pears</option>
		<option value="6">Bananas</option>
		<option value="7">Grapes</option>
		<option value="8">Kiwi</option>
		<option value="9">Mangos</option>
		<option value="10">Pineapples</option>
		<option value="11">Tomatos</option>
		<option value="12">Tangerines</option>
		<option value="13">Lemons</option>
	</select>

Then, in your document ready function:

	<script>
		$(document).ready(function() {
			$("#fruit").dropdowncheckbox();
		});
	</script>

The original `select` gets hidden. The drop down checkbox list inherits the width of the original. You can change that with the width option. `width` is expressed in pixels.

	<script>
		$(document).ready(function() {
			$("#fruit").dropdowncheckbox({
				width: 150
			});
		});
	</script>

The drop down checkbox list has resize capability turned on by default for browsers that support it. You can disable or change that with the resize option. It uses the same values as the css "resize" property (both, none, horizontal, vertical, etc.).

NOTE: resizing works a little differently on Google Chrome than Firefox, possibly because of issues #[72841](https://code.google.com/p/chromium/issues/detail?id=72841) and [94583](https://code.google.com/p/chromium/issues/detail?id=94583)

	<script>
		$(document).ready(function() {
			$("#fruit").dropdowncheckbox({
				width: 150,
				resize: "none"
			});
		});
	</script>


