$('.blog__anim-e').mouseenter((e) =>  {

	anime({
		targets: `.blog__anim-e[data-target="${$(e.target).attr('data-target')}"] span`,
		translateY: 20,
		opacity: 1,
		easing: 'easeOutElastic(1, .8)',
		delay: (el, i, l) => {

			if (i == 0) return 200				

			return ++i * 200
		}
	})


	$(e.target).attr('data-toggle', 'true')

})

$('.blog__anim-e').mouseleave((e) => {

	$(e.target).attr('data-toggle', 'false')

	new Promise((resolve) =>  {

		setTimeout(() => {

			resolve($(e.target).attr('data-toggle'));

		}, 600)

	}).then((response) =>  {

		if (response == 'false') {

			anime({
				targets: `.blog__anim-e[data-target="${$(e.target).attr('data-target')}"] span`,
				translateY: 0,
				opacity: 0

			});			

		}

	}) 


})