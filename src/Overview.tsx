import {
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Container,
    createStyles,
    IconButton,
    makeStyles,
    Theme
} from "@material-ui/core";
import React from "react";
import { useListingsContext } from "./ListingsContext";
import { OverviewTable } from "./OverviewTable";
import { OverviewTreemap } from "./OverviewTreemap";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    header: {
        padding: 0,
        marginLeft: 2,
        marginRight: 5,
    },
    content: {
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        "&:last-child": {
            paddingBottom: 16
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    button : {
        padding: 0
    },
}));

export const Overview = () => {
    const [ loaded, setLoaded ] = React.useState(false);
    const { listings } = useListingsContext()!;
    const data = React.useRef<any>();
    const classes = useStyles();
    const [ expanded, setExpanded ] = React.useState(true);
    const [dimensions, setDimensions] = React.useState({
        width: 0,
        height: 0
    });

    const ref = React.useCallback((node) => {
        const observer = new ResizeObserver(entries => {
            const { height, width } = entries[0].contentRect;
            setDimensions({
                width: width,
                height: height,
            });
        });
        if (node) {
            observer.observe(node);
        }
        return () => {
            observer.unobserve(node);
        };
    }, []);

    const treemapData = React.useCallback(() => {
        setLoaded(false);
        let listingsData = listings.map(listing => ({
            category: 'Market Cap',
            name: listing.symbol,
            value: listing.quote.USD.market_cap,
        }));

        data.current = {
            name: 'Market Cap Treemap',
            children: listingsData
        };
        setLoaded(true);            
    }, [listings]);

    React.useEffect(() => {
        if (listings.length > 0) {
            treemapData();
        }
    }, [listings, treemapData]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Container maxWidth="lg" disableGutters>
            <Card className={classes.root}>
                <CardHeader
                 className={classes.header}
                 title="Market Cap Breakdown"
                 action={
                    <IconButton
                     className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      }, classes.button)}
                     onClick={handleExpandClick}
                     aria-expanded={expanded}
                     aria-label="show graph"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                 }
                 titleTypographyProps={{
                    variant: 'subtitle1'
                 }}
                />
                <Collapse
                className={classes.root}
                in={expanded}
                timeout="auto"
                onEnter={() => setLoaded(true)}
                unmountOnExit
                mountOnEnter
                >
                    <CardContent className={classes.content}>
                        <div
                         style={{ height: '300px', width: '100%' }}
                         ref={ref}>
                            {loaded && 
                                <OverviewTreemap
                                data={data.current}
                                height={dimensions.height}
                                width={dimensions.width}
                                key={listings[0].quote.USD.market_cap}
                                />
                            }
                        </div>
                    </CardContent>
                </Collapse>
            </Card>
            
            <OverviewTable
             headers={[
                "Rank",
                "Name",
                "Price (USD)",
                "Market Cap",
                "Volume 24hr",
                "1hr",
                "24hr"
             ]}
            />

        </Container>
    );
};